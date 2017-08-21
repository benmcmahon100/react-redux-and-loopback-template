const initialState = {};

export default function(prevState = initialState, action) {
  switch (action.type) {
    case 'sampleAction':
      return Object.assign({}, prevState, action.payload);
    default:
      return prevState;
  }
}
