'use client'

import { LogOut } from 'lucide-react'

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
} from '@/ui/alert-dialog'

interface LogoutButtonProps {
  signOut: () => Promise<void>
}

export function LogoutButton({ signOut }: LogoutButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-muted text-muted-foreground hover:text-foreground flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors">
        <LogOut className="h-4 w-4" />
        Sign out
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            This will end your current session on this device.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => void signOut()}>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
