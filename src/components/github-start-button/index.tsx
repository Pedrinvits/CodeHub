'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UpdateStar } from '../../../data/github-star/updateStar'

import { toast } from '@/hooks/use-toast'
import { getAllStars } from '../../../data/github-star/getAllStarts'

export default function GitHubStarButton({
  repoUrl = 'https://github.com/Pedrinvits/CodeHub',
}: { repoUrl?: string, initialStars?: number }) {
  const [stars, setStars] = useState("")
  const [isStarred, setIsStarred] = useState(false)

  useEffect(() => {
      const fetchStars = async () => {
        const res = await getAllStars() 
        setStars(res.totalStars)
        setIsStarred(res.isUserStar)
      }
      fetchStars()
      
 
  }, [repoUrl])

  const handleClick = async () => {
    const res = await UpdateStar()
      if (!isStarred) {
        setStars(prevStars => prevStars + 1)
        setIsStarred(true)
        window.open(repoUrl, '_blank') 
        toast({
          title : "Thanks for your star!"
        })
      } else {
        setStars(prevStars => prevStars - 1)
        setIsStarred(false)
        toast({
          title : "Why you do this ? :c"
        })
      }
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className={`flex items-center space-x-2 ${isStarred ? 'border-yellow-400' : ''}`}
    >
      <Star className={`w-4 h-4 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
      <span>{isStarred ? 'Starred' : 'Star'}</span>
      <span className="text-xs font-semibold rounded-full">
        {stars}
      </span>
    </Button>
  )
}
