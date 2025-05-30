"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function MeetingsIdPage({ params }: { params: { id: string } }) {
  const [isTrue, setIsTrue] = useState<boolean>(false);

  return (
    <main
      className={`flex flex-col items-center h-full p-4 bg-muted ${
        !isTrue ? "justify-center" : ""
      }`}
    >
      {isTrue ? (
        <div className="flex w-full flex-col gap-6 my-8 items-center justify-center">
          <Tabs defaultValue="transcription" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="transcription">Transcrição</TabsTrigger>
              <TabsTrigger value="record">Gravação</TabsTrigger>
              <TabsTrigger value="summary">Resumo</TabsTrigger>
            </TabsList>

            <TabsContent value="transcription">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-name">Name</Label>
                    <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Username</Label>
                    <Input id="tabs-demo-username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="record">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Current password</Label>
                    <Input id="tabs-demo-current" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">New password</Label>
                    <Input id="tabs-demo-new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Current password</Label>
                    <Input id="tabs-demo-current" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">New password</Label>
                    <Input id="tabs-demo-new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex w-full  flex-col gap-3 my-8 items-center justify-center">
          <h2 className="text-2xl font-semibold">
            Reunião ainda não foi iniciada
          </h2>
          <p className="text-sm font-light">
            Uma vez iniciada, o resumo vai aparecer aqui
          </p>
        </div>
      )}

      <div className="w-full flex gap-2 items-center justify-center">
        <Button className="cursor-pointer">Iniciar reunião</Button>
        <Button variant="destructive" className="cursor-pointer">
          Cancelar reunião
        </Button>
      </div>
    </main>
  );
}
