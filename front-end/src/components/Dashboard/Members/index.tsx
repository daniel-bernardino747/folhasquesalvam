import Image from "next/image";

const MEMBERS_TO_RENDER_LIMIT = 5;
const PROFILE_IMAGE_SPACING = 25;

export function ViewMembers({ data }: { data: any }) {
  const firstFiveMembers = data.slice(0, MEMBERS_TO_RENDER_LIMIT);
  const hasMoreThanFiveMembers = data.length > MEMBERS_TO_RENDER_LIMIT;
  const moreMembersIconDistance =
    MEMBERS_TO_RENDER_LIMIT * PROFILE_IMAGE_SPACING;

  return (
    <div className="relative flex w-1/4 gap-10">
      {firstFiveMembers?.map((member: any, memberIndex: number) => {
        const distance = memberIndex * PROFILE_IMAGE_SPACING;

        return (
          <Image
            key={member.id}
            className="absolute h-10 w-10 cursor-pointer rounded-full border-2 border-white hover:scale-105"
            style={{ right: distance }}
            width={40}
            height={40}
            src={member.profileImageUrl}
            alt={`${member.name} - Profile Image`}
          />
        );
      })}
      {hasMoreThanFiveMembers && (
        <div
          className="absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#F4D7DA] text-[#D25B68] hover:scale-105"
          style={{ right: moreMembersIconDistance }}
        >
          +{data.length - 5}
        </div>
      )}
    </div>
  );
}
