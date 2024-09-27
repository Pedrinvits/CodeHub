"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CreditEligibilityChecker = () => {
    
  const [salary, setSalary] = useState('')
  const [education, setEducation] = useState('')
  const [cards, setCards] = useState('')
  const [debts, setDebts] = useState('')
  const [savings, setSavings] = useState('')
  const [eligibility, setEligibility] = useState<string | null>(null)

  const checkEligibility = () => {
    let score = 0
    const annualSalary = parseFloat(salary) || 0
    const numCards = parseInt(cards) || 0
    const totalDebts = parseFloat(debts) || 0
    const totalSavings = parseFloat(savings) || 0

    // Salary scoring
    if (annualSalary > 100000) score += 30
    else if (annualSalary > 50000) score += 20
    else if (annualSalary > 30000) score += 10

    // Education scoring
    if (education === 'postgraduate') score += 20
    else if (education === 'graduate') score += 15
    else if (education === 'undergraduate') score += 10

    // Credit cards scoring
    if (numCards <= 2) score += 10
    else if (numCards <= 4) score += 5
    else score -= 5

    // Debt-to-Income ratio scoring
    const debtToIncomeRatio = totalDebts / annualSalary
    if (debtToIncomeRatio < 0.1) score += 20
    else if (debtToIncomeRatio < 0.3) score += 10
    else if (debtToIncomeRatio > 0.5) score -= 10

    // Savings-to-Income ratio scoring
    const savingsToIncomeRatio = totalSavings / annualSalary
    if (savingsToIncomeRatio > 0.2) score += 20
    else if (savingsToIncomeRatio > 0.1) score += 10

    // Determine eligibility
    if (score >= 70) {
      setEligibility('Eligible')
    } else if (score >= 50) {
      setEligibility('Potentially Eligible')
    } else {
      setEligibility('Not Eligible')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Credit Eligibility Checker</CardTitle>
        <CardDescription>Enter your financial details to check your credit eligibility</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); checkEligibility(); }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Annual Salary ($)</Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your annual salary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Educational Level</Label>
            <Select onValueChange={setEducation} required>
              <SelectTrigger id="education">
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highschool">High School</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="postgraduate">Postgraduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cards">Number of Credit Cards</Label>
            <Input
              id="cards"
              type="number"
              value={cards}
              onChange={(e) => setCards(e.target.value)}
              placeholder="Enter number of credit cards"
              min="0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="debts">Total Debts ($)</Label>
            <Input
              id="debts"
              type="number"
              value={debts}
              onChange={(e) => setDebts(e.target.value)}
              placeholder="Enter your total debts"
              min="0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="savings">Total Savings ($)</Label>
            <Input
              id="savings"
              type="number"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              placeholder="Enter your total savings"
              min="0"
              required
            />
          </div>
          <Button type="submit" className="w-full">Check Eligibility</Button>
        </form>
        {eligibility && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Credit Eligibility Result</h3>
            <p className={`text-2xl font-bold ${
              eligibility === 'Eligible' ? 'text-green-600' : 
              eligibility === 'Potentially Eligible' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {eligibility}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              This is an estimate based on the provided information. Actual eligibility may vary.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
export default CreditEligibilityChecker;