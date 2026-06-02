export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export type TemplateId = 'al-naseem' | 'al-layl' | 'al-rabi3';
export type OpeningStyle = 'fade' | 'slide';

export interface Invitation {
  id: string;
  user_id: string;
  groom_name: string;
  bride_name: string;
  slug: string;
  date_start: string;
  date_end?: string;
  venue_name: string;
  venue_map_url?: string;
  message?: string;
  cover_image_url?: string;
  template_id: TemplateId;
  opening_style: OpeningStyle;
  font_style?: string;
  password?: string;
  is_published: boolean;
  rsvp_enabled: boolean;
  comments_enabled: boolean;
  music_enabled: boolean;
  music_url?: string;
  music_file_url?: string;
  photo_album_enabled: boolean;
  photo_album_urls: string[];
  created_at: string;
}

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  status: 'confirmed' | 'declined' | 'pending';
  companions_count: number;
  created_at: string;
}

export interface Comment {
  id: string;
  invitation_id: string;
  guest_name: string;
  message: string;
  created_at: string;
}
