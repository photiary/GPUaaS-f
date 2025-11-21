'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@workspace/ui/components/carousel'

const slides = [
  { id: 1, title: '슬라이드 1', text: 'Carousel 컴포넌트 기본 사용 예제입니다.' },
  { id: 2, title: '슬라이드 2', text: '좌우 버튼 또는 스와이프로 이동할 수 있어요.' },
  { id: 3, title: '슬라이드 3', text: '반응형으로 동작하며 접근성 속성이 포함되어 있습니다.' },
]

const AUTOPLAY_INTERVAL = 3000

export function CarouselSlide() {
  const [api, setApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    if (!api) return
    const id = setInterval(() => {
      // If at the end and not looping, Embla will clamp. We enable loop below.
      api.scrollNext()
    }, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [api])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Example 2: Carousel</CardTitle>
        <CardDescription>@workspace/ui의 Carousel 컴포넌트를 사용한 예제</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
            <CarouselContent>
              {slides.map((s) => (
                <CarouselItem key={s.id} className="md:basis-1/2 lg:basis-full">
                  <div className="bg-muted/40 rounded-lg border p-16 text-center">
                    <div className="text-sm font-semibold tracking-tight">{s.title}</div>
                    <p className="text-muted-foreground mt-2 text-sm">{s.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 md:-left-6" />
            <CarouselNext className="-right-3 md:-right-6" />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  )
}
