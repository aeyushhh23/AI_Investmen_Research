import { motion } from "framer-motion";
import { Mail, ShieldCheck, UserCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import { useAuth } from "../context/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="blur-orb orb-left" />
            <div className="blur-orb orb-right" />

            <div className="relative z-10">
                <Navbar />
                <main className="flex justify-center">
                    <Container>
                        <section className="mx-auto max-w-3xl py-16">
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45 }}
                                className="glass p-8"
                            >
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-5">
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                                                <UserCircle size={34} />
                                            </div>
                                        )}

                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                                                Profile
                                            </p>
                                            <h1 className="mt-2 text-3xl font-black">
                                                {user?.name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                        <Mail size={20} className="text-cyan-300" />
                                        <p className="mt-4 text-sm text-slate-400">Email</p>
                                        <p className="mt-1 font-bold">{user?.email}</p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                        <ShieldCheck size={20} className="text-green-300" />
                                        <p className="mt-4 text-sm text-slate-400">
                                            Sign-in method
                                        </p>
                                        <p className="mt-1 font-bold capitalize">
                                            {user?.authProvider}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </section>
                    </Container>
                </main>
            </div>
        </div>
    );
};

export default Profile;
