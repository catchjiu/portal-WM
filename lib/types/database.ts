export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          rank: string;
          stripes: number;
          mat_hours: number;
          membership_status: string;
          remaining_classes: number;
          avatar_url: string | null;
          line_id: string | null;
          family_id: string;
          monthly_goal_hours: number;
          yearly_goal_hours: number;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          rank?: string;
          stripes?: number;
          mat_hours?: number;
          membership_status?: string;
          remaining_classes?: number;
          avatar_url?: string | null;
          line_id?: string | null;
          family_id: string;
          monthly_goal_hours?: number;
          yearly_goal_hours?: number;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      families: {
        Row: {
          id: string;
          primary_user_id: string;
          display_name: string;
        };
        Insert: {
          id?: string;
          primary_user_id: string;
          display_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["families"]["Insert"]>;
      };
      family_members: {
        Row: {
          family_id: string;
          profile_id: string;
        };
        Insert: {
          family_id: string;
          profile_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["family_members"]["Insert"]>;
      };
      membership_packages: {
        Row: {
          id: string;
          name: string;
          access_window: string;
          allowed_age_group: string;
          weekly_class_limit: number | null;
        };
        Insert: {
          id?: string;
          name: string;
          access_window?: string;
          allowed_age_group?: string;
          weekly_class_limit?: number | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["membership_packages"]["Insert"]
        >;
      };
      profile_package_assignments: {
        Row: {
          id: string;
          profile_id: string;
          package_id: string;
          starts_on: string;
          ends_on: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          profile_id: string;
          package_id: string;
          starts_on: string;
          ends_on?: string | null;
          is_active?: boolean;
        };
        Update: Partial<
          Database["public"]["Tables"]["profile_package_assignments"]["Insert"]
        >;
      };
      classes: {
        Row: {
          id: string;
          title: string;
          instructor_id: string;
          instructor_name: string;
          start_time: string;
          duration: number;
          age_group: string;
          is_cancelled: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          instructor_id: string;
          instructor_name: string;
          start_time: string;
          duration: number;
          age_group: string;
          is_cancelled?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["classes"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          class_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          class_id: string;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          name_en: string;
          name_zh: string;
          price_twd: number;
          is_preorder: boolean;
          stock_quantity: number;
          category: string;
        };
        Insert: {
          id?: string;
          name_en: string;
          name_zh: string;
          price_twd: number;
          is_preorder?: boolean;
          stock_quantity?: number;
          category: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          subtotal_twd: number;
          is_preorder: boolean;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
          subtotal_twd: number;
          is_preorder?: boolean;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          order_id: string;
          amount: number;
          status: string;
          proof_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_id: string;
          amount: number;
          status?: string;
          proof_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
    };
    Views: {
      family_dashboard: {
        Row: {
          family_id: string;
          family_name: string;
          profile_count: number;
        };
      };
      admin_financial_summary: {
        Row: {
          pending_payments: number;
          approved_revenue_twd: number;
        };
      };
    };
    Functions: {
      booking_eligibility: {
        Args: {
          target_profile_id: string;
          target_class_id: string;
        };
        Returns: {
          allowed: boolean;
          reasons: string[];
        };
      };
      process_kiosk_scan: {
        Args: {
          target_profile_id: string;
        };
        Returns: {
          success: boolean;
          checked_in_bookings: number;
        };
      };
    };
  };
}
