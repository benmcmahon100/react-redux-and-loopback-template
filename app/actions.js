export function genericAction(type, dispatch, payload, err = null) {
  dispatch({
    type,
    err: err,
    payload
  });
}
