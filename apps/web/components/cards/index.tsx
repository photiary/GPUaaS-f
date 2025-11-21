import { CardsActivityGoal } from '@/components/cards/activity-goal'
import { CardsCalendar } from '@/components/cards/calendar'
import { CardsChat } from '@/components/cards/chat'
import { CardsCookieSettings } from '@/components/cards/cookie-settings'
import { CardsCreateAccount } from '@/components/cards/create-account'
import { CardsExerciseMinutes } from '@/components/cards/exercise-minutes'
import { CardsForms } from '@/components/cards/forms'
import { CardsPayments } from '@/components/cards/payments'
import { CardsReportIssue } from '@/components/cards/report-issue'
import { CardsShare } from '@/components/cards/share'
import { CardsStats } from '@/components/cards/stats'
import { CardsTeamMembers } from '@/components/cards/team-members.tsx'
import { AccordionAlert } from '@/components/cards/accordion-alert.tsx'
import { CarouselSlide } from '@/components/cards/carousel-slide.tsx'
import { AlertSet } from '@/components/cards/alert-set.tsx'
import { CheckboxToggle } from '@/components/cards/checkbox-toggle.tsx'
import { ComboboxForm } from '@/components/cards/combobox-form.tsx'

export function CardsDemo() {
  return (
    <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11">
      <div className="grid gap-4 lg:col-span-4 xl:col-span-6">
        <CardsStats />
        <div className="grid gap-1 sm:grid-cols-[auto_1fr] md:hidden">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-4">
            <CardsExerciseMinutes />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="flex flex-col gap-4">
            <CardsForms />
            <CardsTeamMembers />
            <CardsCookieSettings />
            <CarouselSlide />
            <ComboboxForm />
          </div>
          <div className="flex flex-col gap-4">
            <CardsCreateAccount />
            <CardsChat />
            <div className="hidden xl:block">
              <CardsReportIssue />
            </div>
            <AlertSet />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-5">
        <div className="hidden gap-1 sm:grid-cols-[auto_1fr] md:grid">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-3">
            <CardsExerciseMinutes />
          </div>
        </div>
        <div className="hidden md:block">
          <CardsPayments />
        </div>
        <CardsShare />
        <AccordionAlert />
        <div className="xl:hidden">
          <CardsReportIssue />
        </div>
        <CheckboxToggle />
      </div>
    </div>
  )
}
