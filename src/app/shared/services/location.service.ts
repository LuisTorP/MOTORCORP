import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, effect } from '@angular/core';
import { Location } from '../interfaces/location.interface';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);
  private selectedDepartment = signal<string | null>(null);
  private selectedProvince = signal<string | null>(null);
  departments = signal<Location[]>([]);
  provinces = signal<Location[]>([]);
  districts = signal<Location[]>([]);

  constructor() {
    this.getLocation();
    effect(() => {
      const department = this.selectedDepartment();
      const deps = this.departments();
      const provinces =
        deps.find(dep => dep.value === department)?.provinces || [];
      this.provinces.set(provinces);
    });
    effect(() => {
      const province = this.selectedProvince();
      const provs = this.provinces();
      const districts = provs.find(p => p.value === province)?.districts || [];
      this.districts.set(districts);
    });
  }

  private getLocation() {
    return this.http
      .get<Location[]>('data/locations.json')
      .subscribe(locations => {
        this.departments.set(locations);
      });
  }

  selectDepartment(value: string | null) {
    this.selectedDepartment.set(value);
  }

  selectProvince(value: string | null) {
    this.selectedProvince.set(value);
  }
}
