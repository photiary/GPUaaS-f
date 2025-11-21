'use client'

import dayjs from 'dayjs'

import { Calendar } from '@workspace/ui/components/calendar'
import { Card, CardContent } from '@workspace/ui/components/card'

const start = new Date()

export function CardsCalendar() {
  return (
    <div className="*:data-[slot=card]:bg-card *:data-[slot=card]:bg-none">
      <Card className="hidden max-w-[260px] p-0 sm:flex">
        <CardContent className="p-0">
          <Calendar
            numberOfMonths={1}
            mode="range"
            defaultMonth={start}
            selected={{
              from: start,
              to: dayjs(start).add(8, 'day').toDate(),
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
