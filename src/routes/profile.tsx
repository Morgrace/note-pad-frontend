import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Camera, Save, User, Lock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  const user = useAuthStore((state) => state.user)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement profile update
    console.log('Update profile')
  }

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement password update
    console.log('Update password')
  }

  const getInitials = () => {
    if (!user) return 'U'
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Profile Settings</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Picture Section */}
          <Card className="shadow-lg border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Camera className="h-5 w-5 text-teal-600" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-teal-100"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-teal-100">
                      {getInitials()}
                    </div>
                  )}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all hover:scale-110"
                  >
                    <Camera className="h-5 w-5" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Change Profile Picture
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Upload a new profile picture. Recommended size: 400x400px
                  </p>
                  <label htmlFor="profile-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-300 hover:bg-slate-50"
                      onClick={() => document.getElementById('profile-upload')?.click()}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="shadow-lg border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <User className="h-5 w-5 text-teal-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold mb-2 text-slate-700">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      defaultValue={user?.firstName}
                      placeholder="John"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold mb-2 text-slate-700">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue={user?.lastName}
                      placeholder="Doe"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700">
                    Email Address
                    <span className="text-slate-500 font-normal ml-2">(Cannot be changed)</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="border-slate-300 bg-slate-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold mb-2 text-slate-700">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date of Birth
                  </label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Password Update */}
          <Card className="shadow-lg border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Lock className="h-5 w-5 text-teal-600" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-semibold mb-2 text-slate-700">
                    Current Password
                  </label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold mb-2 text-slate-700">
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    minLength={8}
                    className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-slate-700">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    minLength={8}
                    className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
