"use client"

import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from "@/components/ui/select";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      onValueChange={(value) => {
        setTheme(value)
      }}
    >
      <SelectTrigger>
        <SelectValue
          className="w-[140px]"
          placeholder={theme === 'dark' ? 'Dark' : 'Light'}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className={"focus:bg-transparent"}
          defaultChecked={false}
          value="dark"
        >
          Dark
        </SelectItem>
        <SelectSeparator />
        <SelectItem
          className={"focus:bg-transparent"}
          defaultChecked={false}
          value="light"
        >
          Light
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
