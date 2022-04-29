function commentUserEmailMatchLoginUserEmail(commentUserEmail, loginUserEmail) {
  if (commentUserEmail === loginUserEmail) {
    return true;
  }
  return false;
}

function postUserEmailMatchLoginUserEmail(postUserEmail, loginUserEmail) {
  if (postUserEmail === loginUserEmail) {
    return true;
  }
  return false;
}

export {
  commentUserEmailMatchLoginUserEmail,
  postUserEmailMatchLoginUserEmail,
};
