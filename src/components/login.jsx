"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginTabs() {
  const [role, setRole] = useState("doctor")
    const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if(role === "doctor") {
        router.push("/miruDoc")
    } else {
         router.push("/miru")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-yellow-400">
      <Card className="w-full max-w-md bg-gray-800 border-yellow-400 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-yellow-400">
            MIRU
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="doctor" className="w-full" onValueChange={setRole}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-700 rounded-lg">
              <TabsTrigger
                value="doctor"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
              >
                Doctor
              </TabsTrigger>
              <TabsTrigger
                value="patient"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
              >
                Patient
              </TabsTrigger>
            </TabsList>

            <TabsContent value="doctor">
              <form
                onSubmit={handleLogin}
                className="flex flex-col space-y-4 mt-4"
              >
                <Input
                  type="text"
                  placeholder="Doctor ID"
                  className="bg-gray-900 border-yellow-400 text-yellow-400"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-900 border-yellow-400 text-yellow-400"
                />
                <Button
                  type="submit"
                  className="bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300"
                >
                  Login as Doctor
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="patient">
              <form
                onSubmit={handleLogin}
                className="flex flex-col space-y-4 mt-4"
              >
                <Input
                  type="text"
                  placeholder="Patient ID"
                  className="bg-gray-900 border-yellow-400 text-yellow-400"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-900 border-yellow-400 text-yellow-400"
                />
                <Button
                  type="submit"
                  className="bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300"
                >
                  Login as Patient
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
