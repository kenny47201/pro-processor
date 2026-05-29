export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attachments: {
        Row: {
          caption: string | null
          created_at: string
          file_size: number
          fix_id: string | null
          id: string
          issue_id: string | null
          mime_type: string
          storage_path: string
          tenant_id: string
          uploaded_by: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          file_size?: number
          fix_id?: string | null
          id?: string
          issue_id?: string | null
          mime_type: string
          storage_path: string
          tenant_id: string
          uploaded_by: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          file_size?: number
          fix_id?: string | null
          id?: string
          issue_id?: string | null
          mime_type?: string
          storage_path?: string
          tenant_id?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          created_by: string
          department: Database["public"]["Enums"]["department"] | null
          facility_id: string | null
          id: string
          last_message_at: string
          status: Database["public"]["Enums"]["conversation_status"]
          tenant_id: string
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["conversation_visibility"]
        }
        Insert: {
          created_at?: string
          created_by: string
          department?: Database["public"]["Enums"]["department"] | null
          facility_id?: string | null
          id?: string
          last_message_at?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          tenant_id: string
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["conversation_visibility"]
        }
        Update: {
          created_at?: string
          created_by?: string
          department?: Database["public"]["Enums"]["department"] | null
          facility_id?: string | null
          id?: string
          last_message_at?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          tenant_id?: string
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["conversation_visibility"]
        }
        Relationships: []
      }
      facilities: {
        Row: {
          created_at: string
          id: string
          name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "facilities_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      fix_trials: {
        Row: {
          created_at: string
          fix_id: string
          id: string
          logged_by: string
          notes: string | null
          outcome: Database["public"]["Enums"]["fix_trial_outcome"]
          press: string | null
          shot_count: number | null
          tenant_id: string
          tool: string | null
        }
        Insert: {
          created_at?: string
          fix_id: string
          id?: string
          logged_by: string
          notes?: string | null
          outcome: Database["public"]["Enums"]["fix_trial_outcome"]
          press?: string | null
          shot_count?: number | null
          tenant_id: string
          tool?: string | null
        }
        Update: {
          created_at?: string
          fix_id?: string
          id?: string
          logged_by?: string
          notes?: string | null
          outcome?: Database["public"]["Enums"]["fix_trial_outcome"]
          press?: string | null
          shot_count?: number | null
          tenant_id?: string
          tool?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fix_trials_fix_id_fkey"
            columns: ["fix_id"]
            isOneToOne: false
            referencedRelation: "knowledge_fixes"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_events: {
        Row: {
          action: Database["public"]["Enums"]["issue_event_action"]
          actor_id: string
          created_at: string
          id: string
          issue_id: string
          metadata: Json | null
          notes: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["issue_event_action"]
          actor_id: string
          created_at?: string
          id?: string
          issue_id: string
          metadata?: Json | null
          notes?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["issue_event_action"]
          actor_id?: string
          created_at?: string
          id?: string
          issue_id?: string
          metadata?: Json | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "issue_events_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_signoffs: {
        Row: {
          created_at: string
          decision: Database["public"]["Enums"]["signoff_decision"]
          id: string
          issue_id: string
          manager_id: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          decision: Database["public"]["Enums"]["signoff_decision"]
          id?: string
          issue_id: string
          manager_id: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          decision?: Database["public"]["Enums"]["signoff_decision"]
          id?: string
          issue_id?: string
          manager_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "issue_signoffs_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
        ]
      }
      issue_watchers: {
        Row: {
          created_at: string
          id: string
          issue_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          issue_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          issue_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_watchers_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
        ]
      }
      issues: {
        Row: {
          asset_id: string | null
          category: Database["public"]["Enums"]["issue_category"]
          closed_at: string | null
          closed_by: string | null
          created_at: string
          created_by: string
          description: string
          due_by: string | null
          facility_id: string | null
          id: string
          linked_conversation_id: string | null
          material_id: string | null
          mold_id: string | null
          owner_id: string | null
          priority: Database["public"]["Enums"]["issue_priority"]
          status: Database["public"]["Enums"]["issue_status"]
          tenant_id: string
          title: string
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          category?: Database["public"]["Enums"]["issue_category"]
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          created_by: string
          description?: string
          due_by?: string | null
          facility_id?: string | null
          id?: string
          linked_conversation_id?: string | null
          material_id?: string | null
          mold_id?: string | null
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["issue_priority"]
          status?: Database["public"]["Enums"]["issue_status"]
          tenant_id: string
          title: string
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          category?: Database["public"]["Enums"]["issue_category"]
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          created_by?: string
          description?: string
          due_by?: string | null
          facility_id?: string | null
          id?: string
          linked_conversation_id?: string | null
          material_id?: string | null
          mold_id?: string | null
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["issue_priority"]
          status?: Database["public"]["Enums"]["issue_status"]
          tenant_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      knowledge_fixes: {
        Row: {
          additive: string | null
          color: string | null
          committed_at: string | null
          committed_by: string | null
          consecutive_passes: number
          created_at: string
          created_by: string
          defect: string | null
          facility_id: string | null
          fix_summary: string | null
          id: string
          material: string | null
          parameter_changes: Json
          press: string | null
          problem: string
          required_passes: number
          root_cause: string
          solution: string
          status: Database["public"]["Enums"]["fix_record_status"]
          tags: string[]
          tenant_id: string
          title: string
          tool: string | null
          total_fails: number
          total_passes: number
          updated_at: string
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          additive?: string | null
          color?: string | null
          committed_at?: string | null
          committed_by?: string | null
          consecutive_passes?: number
          created_at?: string
          created_by: string
          defect?: string | null
          facility_id?: string | null
          fix_summary?: string | null
          id?: string
          material?: string | null
          parameter_changes?: Json
          press?: string | null
          problem?: string
          required_passes?: number
          root_cause?: string
          solution?: string
          status?: Database["public"]["Enums"]["fix_record_status"]
          tags?: string[]
          tenant_id: string
          title: string
          tool?: string | null
          total_fails?: number
          total_passes?: number
          updated_at?: string
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          additive?: string | null
          color?: string | null
          committed_at?: string | null
          committed_by?: string | null
          consecutive_passes?: number
          created_at?: string
          created_by?: string
          defect?: string | null
          facility_id?: string | null
          fix_summary?: string | null
          id?: string
          material?: string | null
          parameter_changes?: Json
          press?: string | null
          problem?: string
          required_passes?: number
          root_cause?: string
          solution?: string
          status?: Database["public"]["Enums"]["fix_record_status"]
          tags?: string[]
          tenant_id?: string
          title?: string
          tool?: string | null
          total_fails?: number
          total_passes?: number
          updated_at?: string
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          facility_id: string | null
          id: string
          screen_name: string | null
          shift: string | null
          status: Database["public"]["Enums"]["profile_status"]
          tenant_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          facility_id?: string | null
          id?: string
          screen_name?: string | null
          shift?: string | null
          status?: Database["public"]["Enums"]["profile_status"]
          tenant_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          facility_id?: string | null
          id?: string
          screen_name?: string | null
          shift?: string | null
          status?: Database["public"]["Enums"]["profile_status"]
          tenant_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_task_activity_log: {
        Row: {
          action: string
          created_at: string
          id: string
          new_value: string | null
          old_value: string | null
          task_item_id: string | null
          task_list_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_item_id?: string | null
          task_list_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_item_id?: string | null
          task_list_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_task_activity_log_task_item_id_fkey"
            columns: ["task_item_id"]
            isOneToOne: false
            referencedRelation: "shift_task_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_task_activity_log_task_list_id_fkey"
            columns: ["task_list_id"]
            isOneToOne: false
            referencedRelation: "shift_task_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_task_items: {
        Row: {
          assigned_to_id: string | null
          assigned_to_type: string | null
          completed_at: string | null
          completed_by: string | null
          created_at: string
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["task_priority"]
          sort_order: number
          status: Database["public"]["Enums"]["task_item_status"]
          task_list_id: string
          text: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          assigned_to_id?: string | null
          assigned_to_type?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          sort_order?: number
          status?: Database["public"]["Enums"]["task_item_status"]
          task_list_id: string
          text: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          assigned_to_id?: string | null
          assigned_to_type?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          sort_order?: number
          status?: Database["public"]["Enums"]["task_item_status"]
          task_list_id?: string
          text?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_task_items_task_list_id_fkey"
            columns: ["task_list_id"]
            isOneToOne: false
            referencedRelation: "shift_task_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_task_lists: {
        Row: {
          created_at: string
          created_by: string
          date: string
          department: Database["public"]["Enums"]["department"] | null
          facility_id: string | null
          id: string
          notes: string | null
          shift: string
          status: Database["public"]["Enums"]["shift_task_list_status"]
          tenant_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          date?: string
          department?: Database["public"]["Enums"]["department"] | null
          facility_id?: string | null
          id?: string
          notes?: string | null
          shift?: string
          status?: Database["public"]["Enums"]["shift_task_list_status"]
          tenant_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string
          department?: Database["public"]["Enums"]["department"] | null
          facility_id?: string | null
          id?: string
          notes?: string | null
          shift?: string
          status?: Database["public"]["Enums"]["shift_task_list_status"]
          tenant_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          county: string | null
          created_at: string
          id: string
          name: string
          operating_model: string | null
          postal_code: string | null
          primary_industry: string | null
          region: string | null
          shifts: string[]
          slug: string
          state: string | null
          time_zone: string | null
          updated_at: string
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          county?: string | null
          created_at?: string
          id?: string
          name: string
          operating_model?: string | null
          postal_code?: string | null
          primary_industry?: string | null
          region?: string | null
          shifts?: string[]
          slug: string
          state?: string | null
          time_zone?: string | null
          updated_at?: string
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          county?: string | null
          created_at?: string
          id?: string
          name?: string
          operating_model?: string | null
          postal_code?: string | null
          primary_industry?: string | null
          region?: string | null
          shifts?: string[]
          slug?: string
          state?: string | null
          time_zone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_conversation: {
        Args: { _conv: string; _user: string }
        Returns: boolean
      }
      can_access_issue: {
        Args: { _issue: string; _user: string }
        Returns: boolean
      }
      can_see_all_departments: { Args: { _user_id: string }; Returns: boolean }
      get_user_department: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["department"]
      }
      get_user_tenant_id: { Args: { _user_id: string }; Returns: string }
      has_any_tenant: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_conversation_participant: {
        Args: { _conv: string; _user: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "processor"
        | "tooling_specialist"
        | "maintenance_tech"
        | "supervisor"
        | "manager"
        | "admin"
        | "super_admin"
      conversation_status: "active" | "archived"
      conversation_visibility: "open" | "private"
      department: "Processing" | "Tooling" | "Maintenance"
      fix_record_status: "draft" | "committed" | "verified"
      fix_trial_outcome: "pass" | "fail"
      issue_category: "process" | "maintenance" | "tooling" | "quality"
      issue_event_action:
        | "created"
        | "assigned"
        | "status_change"
        | "priority_change"
        | "comment"
        | "fix_added"
        | "escalated"
        | "watcher_added"
        | "watcher_removed"
      issue_priority: "low" | "medium" | "high" | "critical"
      issue_status: "open" | "in_progress" | "needs_verification" | "closed"
      profile_status: "pending" | "active" | "inactive"
      shift_task_list_status: "active" | "completed" | "cancelled"
      signoff_decision: "approved" | "rejected" | "needs_work"
      task_item_status: "pending" | "in_progress" | "done" | "skipped"
      task_priority: "normal" | "high" | "urgent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "processor",
        "tooling_specialist",
        "maintenance_tech",
        "supervisor",
        "manager",
        "admin",
        "super_admin",
      ],
      conversation_status: ["active", "archived"],
      conversation_visibility: ["open", "private"],
      department: ["Processing", "Tooling", "Maintenance"],
      fix_record_status: ["draft", "committed", "verified"],
      fix_trial_outcome: ["pass", "fail"],
      issue_category: ["process", "maintenance", "tooling", "quality"],
      issue_event_action: [
        "created",
        "assigned",
        "status_change",
        "priority_change",
        "comment",
        "fix_added",
        "escalated",
        "watcher_added",
        "watcher_removed",
      ],
      issue_priority: ["low", "medium", "high", "critical"],
      issue_status: ["open", "in_progress", "needs_verification", "closed"],
      profile_status: ["pending", "active", "inactive"],
      shift_task_list_status: ["active", "completed", "cancelled"],
      signoff_decision: ["approved", "rejected", "needs_work"],
      task_item_status: ["pending", "in_progress", "done", "skipped"],
      task_priority: ["normal", "high", "urgent"],
    },
  },
} as const
