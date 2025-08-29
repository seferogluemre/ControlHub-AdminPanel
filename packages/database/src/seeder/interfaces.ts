export interface SeederConfig {
  name: string;
  description?: string;
  priority?: number; // Lower number = runs first
  dependencies?: string[]; // Seeders that must run before this seeder
}

export interface Seeder {
  config: SeederConfig;
  seed: (db: any) => Promise<void>;
  rollback?: (db: any) => Promise<void>;
}

export interface SeederRunOptions {
  includeOnly?: string[];
  exclude?: string[];
}

export interface SeederExecutionStats {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  success: boolean;
  error?: Error;
}
