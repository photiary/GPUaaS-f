'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Button } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog'

export function AccordionAlert() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example 1: Accordion & AlertDialog</CardTitle>
        <CardDescription>Next.js + React + shadcn/ui 간단 예제</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>프로젝트 소개</AccordionTrigger>
            <AccordionContent>
              이 카드는 shadcn/ui의 Accordion과 AlertDialog 컴포넌트를 사용한 간단한 예제입니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>사용된 기술</AccordionTrigger>
            <AccordionContent>
              - Next.js, React
              <br />- Tailwind CSS
              <br />- @workspace/ui (shadcn/ui 기반)
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        <AlertDialog>
          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground text-sm">작업 전에 확인이 필요합니다.</div>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="shadow-none">
                경고 대화상자 열기
              </Button>
            </AlertDialogTrigger>
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>이 작업을 진행할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                이 동작은 되돌릴 수 없습니다. 계속 진행하려면 확인을 눌러주세요.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
