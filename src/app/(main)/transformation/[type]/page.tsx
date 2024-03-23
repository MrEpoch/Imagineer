import Header from '@/components/Header'
import TransformationForm from '@/components/TransformationForm';
import { getUserById } from '@/lib/actions/user.action';
import { transformationTypes } from '@/lib/constant'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({ params: { type }}: { params: { type: string }}) {
  const transformation = transformationTypes[type as keyof typeof transformationTypes];
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  if (!transformation) {
    redirect('/');
  }

  const user = await getUserById(userId);

  return (
    <main className="min-h-screen">
      <div className="max-w-screen-xl mx-auto py-8 flex flex-col gap-8">
        <Header title={transformation.title} subtitle={transformation.description} />
        <TransformationForm action="add" userId={user.id} type={transformation.type as keyof typeof transformationTypes} />
      </div>
    </main>
  )
}
