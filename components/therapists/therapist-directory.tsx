"use client";

import * as React from "react";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { SelectField } from "@/components/ui/select";
import { THERAPISTS } from "@/lib/therapists";
import { SERVICES } from "@/lib/catalogue";
import { TherapistCard } from "@/components/therapists/therapist-card";

/*
  Therapist directory with simulated filtering over local sample data —
  speciality, gender preference, language, pressure, service area and
  availability. All client-side; no APIs.
*/

const ANY = "any";

const AREA_OPTIONS = [
  { value: ANY, label: "All areas" },
  { value: "core", label: "Adelaide metro (inner)" },
  { value: "extended", label: "Outer metro" },
  { value: "hills", label: "Adelaide Hills" },
] as const;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function TherapistDirectory() {
  const [speciality, setSpeciality] = React.useState(ANY);
  const [gender, setGender] = React.useState(ANY);
  const [language, setLanguage] = React.useState(ANY);
  const [pressure, setPressure] = React.useState(ANY);
  const [area, setArea] = React.useState(ANY);
  const [day, setDay] = React.useState(ANY);

  const languages = Array.from(
    new Set(THERAPISTS.flatMap((t) => t.languages)),
  ).sort();

  const filtered = THERAPISTS.filter(
    (t) =>
      (speciality === ANY || t.specialties.includes(speciality)) &&
      (gender === ANY || t.gender === gender) &&
      (language === ANY || t.languages.includes(language)) &&
      (pressure === ANY || t.pressure.includes(pressure as never)) &&
      (area === ANY || t.areas.includes(area as never)) &&
      (day === ANY || t.availability.includes(day)),
  );

  function reset() {
    setSpeciality(ANY);
    setGender(ANY);
    setLanguage(ANY);
    setPressure(ANY);
    setArea(ANY);
    setDay(ANY);
  }

  return (
    <div className="flex flex-col gap-card-gap">
      <Card className="grid grid-cols-1 gap-component tablet:grid-cols-3">
        <SelectField
          id="filter-speciality"
          label="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        >
          <option value={ANY}>All massages</option>
          {SERVICES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="filter-gender"
          label="Therapist gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value={ANY}>No preference</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </SelectField>
        <SelectField
          id="filter-language"
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value={ANY}>Any language</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="filter-pressure"
          label="Preferred pressure"
          value={pressure}
          onChange={(e) => setPressure(e.target.value)}
        >
          <option value={ANY}>Any pressure</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="firm">Firm</option>
        </SelectField>
        <SelectField
          id="filter-area"
          label="Service area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          {AREA_OPTIONS.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </SelectField>
        <SelectField
          id="filter-day"
          label="Availability"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value={ANY}>Any day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d === "Sat" || d === "Sun" ? `${d} (weekend)` : d}
            </option>
          ))}
        </SelectField>
      </Card>

      <p className="text-description text-bb-text-description" role="status">
        Showing {filtered.length} of {THERAPISTS.length} therapists
      </p>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-start gap-component">
          <SearchX aria-hidden="true" className="size-8 text-primary" />
          <CardDescription>
            No therapists match that combination of filters. Try widening your
            search — or book with automatic matching and we&apos;ll assign the
            best available therapist for your massage and time.
          </CardDescription>
          <Button type="button" variant="secondary" onClick={reset}>
            Clear all filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          {filtered.map((t) => (
            <TherapistCard key={t.id} therapist={t} />
          ))}
        </div>
      )}
    </div>
  );
}
