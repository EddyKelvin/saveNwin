export const setRole = (payload) => ({
    type: "SET_ROLE",
    payload
});
  
export const setProfile = payload => ({
    type: "SET_PROFILE",
    payload,
});

export const setStage = payload => ({
    type: "SET_STAGE",
    payload
})

export const setPassword = payload => ({
    type: "SET_PASSWORD",
    payload,
});

export const cleanup = () => ({
    type: "CLEANUP",
});

  