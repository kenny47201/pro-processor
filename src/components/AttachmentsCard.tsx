import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, Trash2, Paperclip } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { canDeleteAttachment } from '@/lib/permissions';

interface Attachment {
  id: string;
  storage_path: string;
  mime_type: string;
  file_size: number;
  caption: string | null;
  uploaded_by: string;
  created_at: string;
}

interface Props {
  /** Provide exactly one of these */
  issueId?: string;
  fixId?: string;
  tenantId: string;
}

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif,image/heic';

export default function AttachmentsCard({ issueId, fixId, tenantId }: Props) {
  const { currentUser } = useTenant();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Attachment | null>(null);

  const filterCol = issueId ? 'issue_id' : 'fix_id';
  const filterVal = issueId ?? fixId ?? '';

  const load = async () => {
    if (!filterVal) return;
    const { data, error } = await supabase
      .from('attachments')
      .select('id, storage_path, mime_type, file_size, caption, uploaded_by, created_at')
      .eq(filterCol, filterVal)
      .order('created_at', { ascending: false });
    if (!error) setItems((data ?? []) as Attachment[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    if (!filterVal) return;
    const channel = supabase
      .channel(`attachments-${filterVal}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'attachments', filter: `${filterCol}=eq.${filterVal}` },
        () => load(),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterVal]);

  const publicUrl = (path: string) =>
    supabase.storage.from('attachments').getPublicUrl(path).data.publicUrl;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !currentUser) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast({ title: 'Unsupported file', description: `${file.name} is not an image`, variant: 'destructive' });
          continue;
        }
        if (file.size > MAX_BYTES) {
          toast({ title: 'File too large', description: `${file.name} exceeds 10 MB`, variant: 'destructive' });
          continue;
        }
        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const folder = issueId ? `issues/${issueId}` : `fixes/${fixId}`;
        const path = `${folder}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('attachments')
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) {
          toast({ title: 'Upload failed', description: upErr.message, variant: 'destructive' });
          continue;
        }
        const { error: insErr } = await supabase.from('attachments').insert({
          tenant_id: tenantId,
          issue_id: issueId ?? null,
          fix_id: fixId ?? null,
          uploaded_by: currentUser.id,
          storage_path: path,
          mime_type: file.type,
          file_size: file.size,
        });
        if (insErr) {
          await supabase.storage.from('attachments').remove([path]);
          toast({ title: 'Save failed', description: insErr.message, variant: 'destructive' });
        }
      }
      await load();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const t = deleteTarget;
    setDeleteTarget(null);
    const { error } = await supabase.from('attachments').delete().eq('id', t.id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    await supabase.storage.from('attachments').remove([t.storage_path]);
    setItems(prev => prev.filter(i => i.id !== t.id));
  };

  const canDelete = (a: Attachment) =>
    canDeleteAttachment(currentUser, { uploaded_by: a.uploaded_by, tenant_id: tenantId });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Paperclip className="h-4 w-4" /> Photos & Attachments
          {items.length > 0 && (
            <span className="text-xs font-normal text-muted-foreground">({items.length})</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            aria-label="Upload photos"
          />
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            {uploading ? 'Uploading...' : 'Add photos'}
          </Button>
          <p className="mt-1 text-xs text-muted-foreground">
            JPG, PNG, WEBP, GIF, HEIC · up to 10 MB each
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map(a => {
              const url = publicUrl(a.storage_path);
              return (
                <div key={a.id} className="group relative overflow-hidden rounded-md border bg-muted/30">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="block aspect-square">
                    <img
                      src={url}
                      alt={a.caption ?? 'Attachment'}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </a>
                  {canDelete(a) && (
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      onClick={() => setDeleteTarget(a)}
                      aria-label="Delete photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
