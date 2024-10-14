"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ThemeSelect() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="space-y-2">
      <Label>Theme Color</Label>
      <Select onValueChange={setTheme} value={theme}>
        <SelectTrigger>
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
