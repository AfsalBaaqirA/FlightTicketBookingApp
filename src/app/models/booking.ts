export interface Booking {
  id: string;
  flightId: string;
  userId: string;
  name: string;
  contactInfo: string;
  seat: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Passenger {
  name: string;
  dob: string;
  email: string;
}

export interface Ticket {
  ticketNumber: string,
  flightNumber: string,
  from: string,
  to: string,
  date: string,
  time: string,
  passengers: Passenger[],
  ticketPrice: number
}


//   {
//     id: '1',
//     flightId: '123',
//     userId: '456',
//     name: 'John Doe',
//     contactInfo: 'johndoe@example.com',
//     seat: 'A3',
//     price: 200,
//     status: 'Confirmed',
//     createdAt: '2023-07-01T10:00:00Z',
//     updatedAt: '2023-07-01T10:00:00Z'
//   },