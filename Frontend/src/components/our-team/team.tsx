// TeamMemberCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

interface TeamMember {
  name: string;
  title: string;
  avatarUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
}

const TeamMemberCard2: React.FC<TeamMember> = ({
  name,
  title,
  avatarUrl,
  linkedinUrl,
  twitterUrl,
  instagramUrl,
}) => {
  return (
    <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-2 sm:px-6 lg:px-4">
      <div className="flex flex-col">
        <Link href="#">
          <Image
            className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
            src={avatarUrl}
            alt={name}
            width={400}
            height={400}
          />
        </Link>
        <div className="text-center mt-6">
          <h1 className="text-white text-xl font-bold mb-1">{name}</h1>
          <div className="text-white font-light mb-2">{title}</div>
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
            <Link href={linkedinUrl} className="flex rounded-full  h-10 w-10">
              <FaLinkedin className="text-indigo-700 mx-auto mt-2" />
            </Link>
            <Link href={twitterUrl} className="flex rounded-full  h-10 w-10">
              <FaTwitter className="text-blue-400 mx-auto mt-2" />
            </Link>
            <Link href={instagramUrl} className="flex rounded-full h-10 w-10">
              <FaInstagram className="text-orange-400 mx-auto mt-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard2;
