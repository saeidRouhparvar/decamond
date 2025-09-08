export type LoginForm = {
  phone: string;
};

export type LoginResponseType = {
  results: Array<{
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    phone: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }>;
};
