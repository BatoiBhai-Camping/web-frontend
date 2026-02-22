interface addressType {
  id: string;
  addressType: string;
  country: string;
  state: string;
  district: string;
  pin: string;
  city: string;
  longitude: string;
  latitude: string;
}
interface userType {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  role: string;
  roleStatus: String;
  phone: string | null;
  createdAt: string;
  profileImage: string | null;
  address: addressType[];
}

interface userProfileapi {
    statusCode: Number,
    data: userType,
    message: string,
    success: boolean
}



export type  {addressType, userType, userProfileapi}
