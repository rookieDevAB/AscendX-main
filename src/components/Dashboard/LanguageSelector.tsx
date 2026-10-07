
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { name: "Hindi", code: "hi" },
  { name: "Tamil", code: "ta" },
  { name: "Bengali", code: "bn" },
  { name: "Telugu", code: "te" },
  { name: "Marathi", code: "mr" },
  { name: "Gujarati", code: "gu" },
  { name: "Kannada", code: "kn" },
  { name: "Malayalam", code: "ml" },
  { name: "Punjabi", code: "pa" },
  { name: "Odia", code: "or" },
];

interface LanguageSelectorProps {
  onChange?: (value: string) => void;
}

export function LanguageSelector({ onChange }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="language">Study Language</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger id="language">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Regional Languages</SelectLabel>
            {languages.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                {language.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
