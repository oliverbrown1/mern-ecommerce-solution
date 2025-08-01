import React from 'react'

const Settings = () => {
  return (
    <div className="p-6 max-w-full">
    <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
    
    <form className="space-y-8">
        {/* Account Information */}
        <div className="bg-base-200 p-6 rounded-xl w-4/5">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
            <div className="form-control">
            <label className="label">
                <span className="label-text">Email Address</span>
            </label>
            <input
                type="email"
                defaultValue="user@example.com"
                className="input input-bordered w-full"
            />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Phone Number</span>
            </label>
            <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="input input-bordered w-full"
            />
            </div>
        </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
            />
            <span>Email Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                className="checkbox checkbox-primary"
            />
            <span>SMS Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
            />
            <span>Marketing Newsletter</span>
            </label>
        </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Display Preferences</h2>
        <div className="space-y-4">
            <div className="form-control">
            <label className="label">
                <span className="label-text">Theme</span>
            </label>
            <select className="select select-bordered w-full" defaultValue="light">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
            </select>
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Language</span>
            </label>
            <select className="select select-bordered w-full" defaultValue="en">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
            </div>
        </div>
        </div>

        {/* Security */}
        <div className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
            <input
                type="checkbox"
                className="toggle toggle-primary"
            />
            <span>Two-Factor Authentication</span>
            </label>
            <div className="pt-4">
            <a href="/change-password" className="link link-primary">
                Change Password
            </a>
            </div>
        </div>
        </div>

        <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
    </form>
    </div>
  )
}

export default Settings