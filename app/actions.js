export function sampleAction(dispatch, payload, err=null) {
  dispatch({
    type: 'sampleAction',
    err: err,
    payload
  });
}
