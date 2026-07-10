import React from "react";
import {
  FiMapPin,
  FiBriefcase,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiGlobe,
  FiEdit2,
} from "react-icons/fi";

export const ProfileCard = ({
  profile,
  onEdit,
}) => {
  return (
    <div className="saas-card p-8">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            {profile.headline || "My Profile"}
          </h2>

          <p className="text-slate-500 mt-2">
            {profile.bio || "No bio added yet."}
          </p>

        </div>

        <button
          onClick={onEdit}
          className="saas-bg-primary px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-sm"
        >
          <FiEdit2 />
          Edit Profile
        </button>

      </div>

      {/* Information */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div className="flex items-center gap-3">
          <FiMapPin className="text-orange-500 text-xl" />
          <div>
            <p className="text-xs uppercase text-slate-500">
              Location
            </p>
            <p className="font-medium">
              {profile.location || "-"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiBriefcase className="text-orange-500 text-xl" />
          <div>
            <p className="text-xs uppercase text-slate-500">
              Target Role
            </p>
            <p className="font-medium">
              {profile.targetRole || "-"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiBriefcase className="text-orange-500 text-xl" />
          <div>
            <p className="text-xs uppercase text-slate-500">
              Experience
            </p>
            <p className="font-medium">
              {profile.yearsOfExperience ?? 0} Years
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiPhone className="text-orange-500 text-xl" />
          <div>
            <p className="text-xs uppercase text-slate-500">
              Phone
            </p>
            <p className="font-medium">
              {profile.phoneNumber || "-"}
            </p>
          </div>
        </div>

      </div>

      {/* Social Links */}

      <div className="border-t border-orange-100 mt-8 pt-6">

        <h3 className="font-semibold text-slate-800 mb-4">
          Professional Links
        </h3>

        <div className="flex flex-wrap gap-4">

          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FiLinkedin />
              LinkedIn
            </a>
          )}

          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-700 hover:underline"
            >
              <FiGithub />
              GitHub
            </a>
          )}

          {profile.portfolioUrl && (
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-orange-600 hover:underline"
            >
              <FiGlobe />
              Portfolio
            </a>
          )}

        </div>

      </div>

    </div>
  );
};