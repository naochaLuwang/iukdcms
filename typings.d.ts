interface SelectProps {
  id: string;

  departmentName?: string;
  designations?: DesignationProps[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  departments?: any;
  label?: string;
}

interface MenuForm {
  title: string;
  slug: string;
  order: number;
  status: "ACTIVE" | "INACTIVE";
  content: string;
  isMulti: "YES" | "NO";
  pageType: "dynamic" | "static";
}

interface LinkProps {
  id: string;
  title: string;
  slug: string;
  order: number;
  status: "ACTIVE" | "INACTIVE";
  pageType: "dynamic" | "static";
  isMulti: "YES" | "NO";
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sublinks: SubLinkProps[];
  user: User;
}

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
}

interface SubLinkProps {
  id: string;
  linkId: string;
  userId: string;
  title: string;
  subtitle: string;
  slug: string;
  order: number;
  status: "ACTIVE" | "INACTIVE";
  content: string;
  pageType: "static" | "dynamic";
  createdAt: string;
  updatedAt: string;
  Subsublinks: SubsubLinkProps[];
  user: User;
  link: LinkProps;
}

interface SubsubLinkProps {
  id: string;
  sublinkId: string;
  userId: string;
  title: string;
  slug: string;
  order: number;
  status: "ACTIVE" | "INACTIVE";
  content: string;
  pageType: "static" | "dynamic";
  createdAt: string;
  updatedAt: string;
  user: User;
  subLinks: SubLinkProps;
}

interface DepartmentProps {
  id: string;
  departmentName: string;
  departmentCode: string;
  order: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface PeopleProps {
  id: string;
  salutation: string;
  firstName: string;
  slug: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  designation: string;
  qualification: string;
  opdTiming: string;
  opdDays: string;
  address: string;
  showEmail: string;
  showPhone: string;
  status: string;
  profileUrl: string;
  bio: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;

  department: DepartmentProps;
}

interface DesignationProps {
  id: string;
  designationName: string;
  designationCode: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface AlbumProps {
  id: string;
  userId: string;
  title: string;
  thumbnailImage: string;
  status: "ACTIVE" | "INACTIVE";
  order: number;
  createdAt: string;
  updatedAt: string;
  images: ImageProps[];
}

interface ImageProps {
  id: string;
  albulmId: string;
  imageUrl: string;
}

interface carousalimageProps {
  id: string;
  userId: string;
  title: string;
  imgUrl: string;
  status: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface ProgrammeProps {
  id: string;
  slug: string;
  programmeName: string;
  programmeCode: string;
  programmeType: string;
  programmeDuration: string;
  minQualification: string;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface TestimonialProps {
  id: string;
  name: string;
  sub: string;
  imageUrl: string;
  testimony: string;
  status: "ACTIVE" | "INACTIVE";
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface AlertProps {
  id: string;
  title: string;
  slug?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
