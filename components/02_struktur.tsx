import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    imageUrl:
      "",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    imageUrl:
      "",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    imageUrl:
      "",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    imageUrl:
      "",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    imageUrl:
      "",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    imageUrl:
      "",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    imageUrl:
      "",
  },
  {
    name: "Elizabeth Johnson",
    title: "Customer Success",
    imageUrl:
      "",
  },
];
const Team01Page = () => {
  return (
    <div id="struktur" className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          Struktur Organisasi
        </h2>
      </div>

      <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 max-w-screen-lg mx-auto">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <Image
              src={member.imageUrl}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover mx-auto bg-secondary"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team01Page;
