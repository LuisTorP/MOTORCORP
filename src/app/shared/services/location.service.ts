import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { Location } from '../interfaces/location.interface';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);
  location = signal<Location[]>([]);
  departments = computed(() =>
    this.location().map((department) => ({
      label: department.label,
      value: department.value,
    }))
  );

  constructor() {
    this.getLocation();
  }

  private getLocation() {
    return this.http
      .get<Location[]>('data/locations.json')
      .subscribe((locations) => {
        this.location.set(locations);
      });
  }

  getDepartments(): { label: string; value: string }[] {
    return this.location().map((department) => {
      return {
        label: department.label,
        value: department.value,
      };
    });
  }

  getProvinces(departmentId: string): { label: string; value: string }[] {
    const department = this.location().find(
      (department) => department.value === departmentId
    );
    return (
      department?.provinces?.map((prov) => {
        return { label: prov.label, value: prov.value };
      }) || []
    );
  }

  getDistricts(provinceId: string): { label: string; value: string }[] {
    for (const dept of this.location()) {
      const province = dept?.provinces?.find((p) => p.value === provinceId);
      if (province && province.districts) {
        return province.districts.map((dist) => ({
          label: dist.label,
          value: dist.value,
        }));
      }
    }
    return [];
  }
}
