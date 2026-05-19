// "use client";

// import { SmartImage as Image } from "@/components/ui/SmartImage";
// import { useAuthor } from "@/hooks/useAuthor";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// export function AboutContent() {
//   const { data: author, isLoading } = useAuthor();

//   if (isLoading) {
//     return (
//       <Card className="overflow-hidden">
//         <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
//           <Skeleton className="size-40 shrink-0 rounded-full" />
//           <div className="flex-1 w-full space-y-3">
//             <Skeleton className="h-6 w-40 rounded" />
//             <Skeleton className="h-4 w-full rounded" />
//             <Skeleton className="h-4 w-full rounded" />
//             <Skeleton className="h-4 w-3/4 rounded" />
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!author) {
//     return (
//       <p className="text-muted-foreground">
//         No author info found. Add content in WordPress.
//       </p>
//     );
//   }

//   return (
//     <Card className="overflow-hidden">
//       <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
//         <div className="relative size-40 rounded-full overflow-hidden shrink-0 bg-muted">
//           <Image
//             src={author.image ?? "/placeholder.svg"}
//             alt={author.name}
//             fill
//             className="object-cover"
//           />
//         </div>
//         <div className="flex-1 text-center md:text-left">
//           <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
//           {author.bio && (
//             <p className="text-muted-foreground whitespace-pre-line">{author.bio}</p>
//           )}
//           <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
//             {author.pinterest && (
//               <a
//                 href={author.pinterest}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-primary font-medium hover:underline text-sm"
//               >
//                 Pinterest
//               </a>
//             )}
//             {author.instagram && (
//               <a
//                 href={author.instagram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-primary font-medium hover:underline text-sm"
//               >
//                 Instagram
//               </a>
//             )}
//             {author.facebook && (
//               <a
//                 href={author.facebook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-primary font-medium hover:underline text-sm"
//               >
//                 Facebook
//               </a>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { SmartImage as Image } from "@/components/ui/SmartImage";
import { useAuthor } from "@/hooks/useAuthor";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AboutContent() {
  const { data: author, isLoading } = useAuthor();

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Skeleton className="size-40 shrink-0 rounded-full" />
          <div className="flex-1 w-full space-y-3">
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- FINAL FALLBACK DATA ---
  // Agar WordPress se data na aaye, toh yeh details automatically show hongi
  const finalName = author?.name || "Mila";
  
  const finalImage = author?.image || "/images/author-profile.jpg"; 
  
  const finalBio = author?.bio || "Beauty content creator and chief editor at Her Beauty Hacks. Dedicated to testing and sharing the best DIY skincare treatments, makeup techniques, and time-saving hair hacks. Mila helps women elevate their daily beauty routines without spending a fortune.";

  return (
    <Card className="overflow-hidden border border-border bg-card shadow-card rounded-2xl">
      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
        
        {/* Author Profile Image (DP) */}
        <div className="relative size-40 rounded-full overflow-hidden shrink-0 bg-muted border-2 border-primary/20 shadow-sm">
          <Image
            src={finalImage}
            alt={finalName}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Author Text Details */}
        <div className="flex-1 text-center md:text-left">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-1 block">
            Author
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
            {finalName}
          </h2>
          
          <p className="text-muted-foreground whitespace-pre-line text-sm sm:text-base leading-relaxed">
            {finalBio}
          </p>
          
          {/* Social Links Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            {(author?.pinterest || true) && (
              <a
                href={author?.pinterest || "https://www.pinterest.com/Herbeauty_hacks/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline text-sm"
              >
                Pinterest
              </a>
            )}
            
            {author?.instagram && (
              <a
                href={author.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline text-sm"
              >
                Instagram
              </a>
            )}
            
            {author?.facebook && (
              <a
                href={author.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline text-sm"
              >
                Facebook
              </a>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}