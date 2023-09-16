/* Store Setup

Task:

- Connect to db 
- Set crud user functions.



*/
import { create, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface currentUser {
  name: string;
  email: string;
  phoneNumber: string;
}

interface State {
  currentUser: currentUser;
}

type Actions = {
  updateCurrentUser: (newUser: string) => void;
  readCurrentUser: () => currentUser;
};

const currentUserStore = create<State & Actions>((set, get) => ({
  currentUser: { email: "test@gmail.com", name: "Emilio Cortes", phoneNumber: "33232" },
  updateCurrentUser: (newUser: string) =>
    set(
      produce((state: State) => {
        state.currentUser.name = newUser;
      })
    ),
  readCurrentUser: () => get().currentUser,
}));

export { currentUserStore };
