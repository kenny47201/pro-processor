// Streaming chat endpoint for the Defect AI assistant.
// Uses Lovable AI Gateway (google/gemini-3-flash-preview) with optional image context.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

interface RequestBody {
  messages: ChatMessage[];
  defectContext?: {
    title?: string;
    summary?: string;
    category?: string;
    severity?: string;
    sectionsText?: string; // pre-flattened guide text
  };
  figures?: Array<{
    figureNumber?: string;
    caption?: string;
    alt?: string;
    dataUrl?: string; // data:image/png;base64,...
  }>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body: RequestBody = await req.json();
    const { messages = [], defectContext, figures = [] } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build system prompt with defect context
    let systemPrompt =
      "You are an expert injection-molding defect-troubleshooting assistant for plastics processors, " +
      "tooling specialists, and supervisors. Be concise, technically rigorous, and operationally focused. " +
      "When relevant, structure answers as: Likely Causes → Diagnostic Checks → Corrective Actions → Validation. " +
      "Use the provided defect dossier and any attached figures as authoritative context. " +
      "If the user asks about a figure, reference it by its figure number and describe what it shows. " +
      "Cite the dossier when applicable. Keep formatting in clean Markdown.";

    if (defectContext?.title) {
      systemPrompt +=
        `\n\n--- ACTIVE DEFECT DOSSIER ---\n` +
        `Defect: ${defectContext.title}\n` +
        (defectContext.category ? `Category: ${defectContext.category}\n` : "") +
        (defectContext.severity ? `Severity: ${defectContext.severity}\n` : "") +
        (defectContext.summary ? `Summary: ${defectContext.summary}\n` : "") +
        (defectContext.sectionsText
          ? `\nGuide content:\n${defectContext.sectionsText.slice(0, 12000)}\n`
          : "");
    }

    // Take the last user message and inject attached figure(s) as multimodal content.
    const last = messages[messages.length - 1];
    const earlier = messages.slice(0, -1).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let lastContent: any = last.content;
    if (last.role === "user" && figures.length > 0) {
      const figureCaptions = figures
        .map((f, i) => `[${f.figureNumber ?? `Figure ${i + 1}`}] ${f.caption ?? f.alt ?? ""}`)
        .join("\n");
      const parts: any[] = [
        { type: "text", text: `${last.content}\n\nAttached figure(s):\n${figureCaptions}` },
      ];
      for (const f of figures) {
        if (f.dataUrl) {
          parts.push({ type: "image_url", image_url: { url: f.dataUrl } });
        }
      }
      lastContent = parts;
    }

    const upstream = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...earlier,
            { role: "user", content: lastContent },
          ],
        }),
      },
    );

    if (!upstream.ok) {
      if (upstream.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (upstream.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "AI credits exhausted. Add credits in Settings → Workspace → Usage to continue.",
          }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await upstream.text();
      console.error("AI gateway error:", upstream.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("defect-ai-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
