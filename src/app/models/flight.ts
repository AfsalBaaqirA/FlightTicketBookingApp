export interface Flight {
    flightNumber: string;
    date: string;
    time: string;
    seatCount: number;
    from: string;
    to: string;
    price: Price[];
    duration: string;
    airplane: string;
    gate: string;
    terminal: string;
    passengers: string[];
}

export interface FlightSearch {
    from: string;
    to: string;
    date: string;
    passengers: number;
}


// Price structure
export interface Price {
    id: string;
    priceType: string;
    price: number;
}


//   {
//     id: '2',
//     flightNumber: 'DEF456',
//     date: '2023-07-11',
//     time: '10:30',
//     seatCount: 60,
//     from: 'Los Angeles',
//     to: 'London',
//     price: 500,
//     duration: '10h 15m',
//     airline: 'Airline B',
//     status: 'Delayed',
//     airplane: 'Airbus A380',
//     gate: 'G2',
//     terminal: 'T2',
//     passengers: ['Emily Thompson', 'David Brown'],
//     pilot: 'Robert Johnson',
//     crew: ['Crew Member D', 'Crew Member E'],
//     createdAt: '2023-07-06T12:00:00Z',
//     updatedAt: '2023-07-06T12:00:00Z'
//   },



// {
//     id: '1',
//     priceType: 'Economy',
//     price: 200
//   },
//   {
//     id: '2',
//     priceType: 'Business',
//     price: 500
//   },
//   {
//     id: '3',
//     priceType: 'First Class',
//     price: 800
//   }