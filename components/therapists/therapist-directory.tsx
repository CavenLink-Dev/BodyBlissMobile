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
  Therapist directory — simple simulated filtering over local sample data:
  massage type and gender only. All client-side; no APIs.
*/

const ANY = "any";

export function TherapistDirectory() {
  const [speciality, setSpeciality] = React.useState(ANY);
  const [gender, setGender] = React.useState(ANY);

  const filtered = THERAPISTS.filter(
    (t) =>
      (speciality === ANY || t.specialties.includes(speciality)) &&
      (gender === ANY || t.gender === gender),
  );

  return (
    <div className="flex flex-col gap-card-gap">
      <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
        <SelectField
          id="filter-speciality"
          label="Massage type"
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
      </div>

      <p className="text-description text-bb-text-description" role="status">
        Showing {filtered.length} of {THERAPISTS.length} therapists
      </p>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-start gap-component">
          <SearchX aria-hidden="true" className="size-8 text-primary" />
          <CardDescription>
            No therapists match those filters. Try widening your search, or
            book with automatic matching and we&apos;ll assign the best
            available therapist.
          </CardDescription>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSpeciality(ANY);
              setGender(ANY);
            }}
          >
            Clear filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
          {filtered.map((t) => (
            <TherapistCard key={t.id} therapist={t} />
          ))}
        </div>
      )}
    </div>
  );
}
