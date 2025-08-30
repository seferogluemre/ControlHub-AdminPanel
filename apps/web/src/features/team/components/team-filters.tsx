import { Input } from "#/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { 
  Search, 
  Filter,
  X,
  Grid3x3,
  List,
  Table
} from "lucide-react";
import { TeamFilters, TeamView } from "../types/team";
import { departments, roles } from "../data/team-data";

interface TeamFiltersProps {
  filters: TeamFilters;
  view: TeamView;
  onFiltersChange: (filters: TeamFilters) => void;
  onViewChange: (view: TeamView) => void;
  onClearFilters: () => void;
}

export function TeamFiltersComponent({ 
  filters, 
  view,
  onFiltersChange, 
  onViewChange,
  onClearFilters 
}: TeamFiltersProps) {
  const updateFilter = (key: keyof TeamFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.department !== 'Tümü' || 
    filters.status !== 'all' || 
    filters.role !== 'Tümü';

  const getViewIcon = (viewType: TeamView) => {
    switch (viewType) {
      case 'grid':
        return Grid3x3;
      case 'list':
        return List;
      case 'table':
        return Table;
    }
  };

  const views: { value: TeamView; label: string }[] = [
    { value: 'grid', label: 'Kart Görünümü' },
    { value: 'list', label: 'Liste Görünümü' },
    { value: 'table', label: 'Tablo Görünümü' }
  ];

  return (
    <div className="space-y-4">
      {/* Search and View Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Takım üyelerinde ara..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 border rounded-md">
          {views.map((viewOption) => {
            const Icon = getViewIcon(viewOption.value);
            return (
              <Button
                key={viewOption.value}
                variant={view === viewOption.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(viewOption.value)}
                className="h-9"
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtrele:</span>
        </div>

        <Select 
          value={filters.department} 
          onValueChange={(value) => updateFilter('department', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Departman seçin" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.status} 
          onValueChange={(value) => updateFilter('status', value as TeamFilters['status'])}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Durum seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Pasif</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.role} 
          onValueChange={(value) => updateFilter('role', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rol seçin" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="h-9"
          >
            <X className="h-4 w-4 mr-1" />
            Filtreleri Temizle
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Aktif filtreler:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Arama: {filters.search}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('search', '')}
              />
            </Badge>
          )}
          
          {filters.department !== 'Tümü' && (
            <Badge variant="secondary" className="gap-1">
              Departman: {filters.department}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('department', 'Tümü')}
              />
            </Badge>
          )}
          
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Durum: {filters.status === 'active' ? 'Aktif' : 'Pasif'}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('status', 'all')}
              />
            </Badge>
          )}
          
          {filters.role !== 'Tümü' && (
            <Badge variant="secondary" className="gap-1">
              Rol: {filters.role}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('role', 'Tümü')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
