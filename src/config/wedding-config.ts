export interface WeddingConfig {
  couple: {
    bride: {
      name: string;
      fullName: string;
      photo: {
        url: string;
        aspectRatio: "1:1" | "portrait";
      };
      parents: string;
      about: string;
      socialMedia: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
      };
    };
    groom: {
      name: string;
      fullName: string;
      photo: {
        url: string;
        aspectRatio: "1:1" | "portrait";
        frame?: {
          "1:1": string;
          portrait: string;
        };
      };
      parents: string;
      about: string;
      socialMedia: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
      };
    };
    firstMeet: string;
    loveStory: Array<{
      date: string;
      title: string;
      description: string;
      image: string;
    }>;
  };
  event: {
    akad: {
      date: string;
      time: string;
      location: string;
      address: string;
      mapLink: string;
      dresscode?: string;
    };
    pemberkatan: {
      date: string;
      time: string;
      location: string;
      address: string;
      mapLink: string;
      dresscode?: string;
    };
    reception: {
      date: string;
      time: string;
      location: string;
      address: string;
      mapLink: string;
      dresscode?: string;
    };
  };
  gallery: {
    prewedding: Array<{
      url: string;
      caption: string;
    }>;
    engagement: Array<{
      url: string;
      caption: string;
    }>;
  };
  digitalEnvelope: {
    banks: Array<{
      name: string;
      accountNumber: string;
      accountHolder: string;
    }>;
    eWallets: Array<{
      name: string;
      number: string;
      logo: string;
    }>;
  };
  rsvp: {
    whatsappNumber: string;
    formFields: Array<{
      name: string;
      label: string;
      type: string;
      options?: string[];
    }>;
  };
  specialFeatures: {
    countdownTimer: boolean;
    photoBoothFrame: boolean;
    virtualGuestBook: boolean;
    giftRegistry: {
      enabled: boolean;
      items: Array<{
        title: string;
        description?: string;
        image: string;
        link?: string;
      }>;
    };
    liveStreaming: {
      enabled: boolean;
      platform: string;
      link: string;
    };
  };
}


export const themes = {
  sage: {
    primary: "#B2BEB5",
    secondary: "#E8EDE6",
    accent: "#9CAF88",
    text: "#454B1B"
  },
  dustyBlue: {
    primary: "#4F6F8F",
    secondary: "#E5EDF5",
    accent: "#8FA5BC",
    text: "#2C3E50"
  },
  softBrown: {
    primary: "#B49F89",
    secondary: "#F5E6D3",
    accent: "#DEC4A7",
    text: "#5E4B3B"
  },
  roseDust: {
    primary: "#C5AFA0",
    secondary: "#F2E9E4",
    accent: "#E6D1C5",
    text: "#8C7267"
  },
  oliveGreen: {
    primary: "#A3B18A",
    secondary: "#E9EDe4",
    accent: "#CAD2C5",
    text: "#52573D"
  }
};

export const weddingConfig = {
  couple: {
    bride: {
      name: "Cindy",
      fullName: "Cindy Surjawan",
      photo: {
        url: "/images/couple/bride.webp",
        aspectRatio: "portrait",
        frame: {
          "1:1": "/images/couple/frame-photo-1.webp",
          portrait: "/images/couple/frame-photo-2.webp"
        }
      },
      parents: "The Daughter of Mr.Tommy Surjawan dan Mrs.Midyawati Gunawan",
      about: "Deskripsi singkat tentang mempelai wanita",
      socialMedia: {
        instagram: "https://instagram.com/cindysurjawan",
        facebook: undefined,
        twitter: undefined
      }
    },
    groom: {
      name: "Vincen",
      fullName: "Vincensius Anthony Sanjaya",
      photo: {
        url: "/images/couple/groom.webp",
        aspectRatio: "1:1",
        frame: {
          "1:1": "/images/couple/frame-photo-1.webp",
          portrait: "/images/couple/frame-photo-2.webp"
        }
      },
      parents: "The Son of Mr.Hardi Sanjaya & Mrs.Fifi",
      about: "Deskripsi singkat tentang mempelai pria",
      socialMedia: {
        instagram: "https://instagram.com/vincenciusanthony",
        facebook: undefined,
        twitter: undefined
      }
    },
    firstMeet: "He has made everything beautiful in its time.(Ecclesiastes 3:11)",
    loveStory: [
      {
        date: "January 2018",
        title: "Officially a Couple",
        description: "Our story began in junior high school, where we first crossed paths. As the years went by, we grew closer during our final years of high school. After a year of courtship, we officially began our journey as a couple in January 2018",
        image: "/images/story/first-meet.webp"
      },
      {
        date: "June 2026",
        title: "Officially Engaged",
        description: "After eight years as a couple, and with our hearts and lives prepared for the future, we decided to take the next step and commit to a more serious journey together.",
        image: "/images/gallery/prewedding-1.webp"
      },
      {
        date: "2027",
        title: "The Beginning of Forever",
        description: "After years of growing together, we are finally ready to say I DO and begin our forever.",
        image: "/images/gallery/prewedding-2.webp"
      }
    ]
  },
  event: {
    pemberkatan: {
      date: "2027-01-01",
      time: "08:00",
      venue: "Gereja",
      address: "Alamat Lengkap",
      mapLink: "Google Maps Link",
      dresscode: "",
      additional_info: "Info tambahan tentang acara pemberkatan"
    },
    reception: {
      date: "2027-01-01",
      time: "19:00",
      venue: "Nama Tempat",
      address: "Alamat Lengkap",
      mapLink: "Google Maps Link",
      dresscode: "",
      additional_info: "Info tambahan tentang acara resepsi"
    }
  },
  digitalEnvelope: {
    banks: [
      {
        name: "BCA",
        accountNumber: "1234567890",
        accountHolder: "Vincensius Anthony"
      },
      {
        name: "BCA",
        accountNumber: "6040875857",
        accountHolder: "Cindy Surjawan"
      }
    ],
    eWallets: [
      {
        name: "GoPay",
        number: "082299691933",
        logo: "/images/logos/gopay.webp"
      },
      {
        name: "ShopeePay",
        number: "082299691933",
        logo: "/images/logos/shopeepay.webp"
      }
    ]
  },
  gallery: {
    prewedding: [
      {
        url: '/images/gallery/optimized/prewedding-1.webp',
        caption: 'Our First Date - Where It All Began'
      },
      {
        url: '/images/gallery/optimized/prewedding-2.webp',
        caption: 'Beach Getaway - Our First Vacation'
      },
      {
        url: '/images/gallery/optimized/prewedding-3.webp',
        caption: 'Hiking Together - Overcoming Challenges'
      },
      {
        url: '/images/gallery/optimized/moment-1.webp',
        caption: 'First Concert - Sharing Our Love for Music'
      }
    ]
  },
  music: {
    tracks: [
      {
        src: '/music/song1.mp3',
        title: 'Lagu 1',
        artist: 'Artis 1'
      }
    ]
  },
  guestBook: {
    enabled: true,
    moderationEnabled: true
  },
  rsvp: {
    enabled: true,
    deadline: "2024-05-20",
    whatsappNumber: "081234567890",
    additionalFields: [
      {
        name: "jumlah_tamu",
        label: "Jumlah Tamu",
        type: "number"
      },
      {
        name: "kehadiran",
        label: "Konfirmasi Kehadiran",
        type: "select",
        options: ["Hadir", "Tidak Hadir", "Masih Ragu"]
      }
    ]
  },
  specialFeatures: {
    countdownTimer: true,
    photoBoothFrame: true,
    virtualGuestBook: true,
    giftRegistry: {
      enabled: false,
      items: [
        {
          title: "Amazon Registry",
          description: "Find our wishlist on Amazon",
          image: "/images/registry/amazon.webp",
          link: "https://amazon.com/registry/..."
        },
        {
          title: "Target Registry",
          description: "Shop our registry at Target",
          image: "/images/registry/target.webp",
          link: "https://target.com/registry/..."
        }
      ]
    },
    liveStreaming: {
      enabled: false,
      platform: "YouTube",
      link: "https://youtube.com/live/..."
    }
  }
}