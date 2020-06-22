export default function({ store, redirect, route }) {
    if (!store.state.auth.token) {
        return redirect("/");
    }
}
