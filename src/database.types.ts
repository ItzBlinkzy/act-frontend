export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bought_stocks: {
        Row: {
          client_id: number | null
          created_at: string
          deleted_at: string | null
          id: number
          quantity_owned: number | null
          quantity_sold: number | null
          ticker: string
          updated_at: string
          user_id: number
        }
        Insert: {
          client_id?: number | null
          created_at: string
          deleted_at?: string | null
          id?: number
          quantity_owned?: number | null
          quantity_sold?: number | null
          ticker: string
          updated_at: string
          user_id: number
        }
        Update: {
          client_id?: number | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          quantity_owned?: number | null
          quantity_sold?: number | null
          ticker?: string
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_client_bought_stocks"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_manager_association: {
        Row: {
          client_id: number
          created_at: string
          deleted_at: string | null
          id: number
          manager_id: number
          updated_at: string
        }
        Insert: {
          client_id: number
          created_at: string
          deleted_at?: string | null
          id?: number
          manager_id: number
          updated_at: string
        }
        Update: {
          client_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          manager_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_client_user"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company_name: string
          created_at: string
          deleted_at: string | null
          id: number
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at: string
          deleted_at?: string | null
          id?: number
          updated_at: string
        }
        Update: {
          company_name?: string
          created_at?: string
          deleted_at?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      logs_bought_stocks: {
        Row: {
          bought_stock_id: number
          client_id: number | null
          created_at: string
          id: number
          quantity_bought: number | null
          quantity_sold: number | null
          user_id: number
        }
        Insert: {
          bought_stock_id: number
          client_id?: number | null
          created_at?: string
          id?: number
          quantity_bought?: number | null
          quantity_sold?: number | null
          user_id: number
        }
        Update: {
          bought_stock_id?: number
          client_id?: number | null
          created_at?: string
          id?: number
          quantity_bought?: number | null
          quantity_sold?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_logs_bought_stocks"
            columns: ["bought_stock_id"]
            isOneToOne: false
            referencedRelation: "bought_stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_logs_clients_stocks"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string
          id: number
          stars: number
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at: string
          deleted_at?: string | null
          description: string
          id?: number
          stars: number
          updated_at: string
          user_id: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: number
          stars?: number
          updated_at?: string
          user_id?: number
        }
        Relationships: []
      }
      type_user: {
        Row: {
          id: number
          type_of_user: string
        }
        Insert: {
          id?: number
          type_of_user: string
        }
        Update: {
          id?: number
          type_of_user?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          credit: number | null
          deleted_at: string | null
          email: string
          first_name: string
          id: number
          last_name: string
          password: string
          type_user_id: number
          updated_at: string
        }
        Insert: {
          created_at: string
          credit?: number | null
          deleted_at?: string | null
          email: string
          first_name: string
          id?: number
          last_name: string
          password: string
          type_user_id: number
          updated_at: string
        }
        Update: {
          created_at?: string
          credit?: number | null
          deleted_at?: string | null
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          password?: string
          type_user_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_type_user"
            columns: ["type_user_id"]
            isOneToOne: false
            referencedRelation: "type_user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never