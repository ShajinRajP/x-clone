import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseUrl } from "../../constant/url";
import { useMutation, useQueries, useQueryClient, useQuery } from "@tanstack/react-query";

const Sidebar = () => {


	const queryClient = useQueryClient();
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch(`${baseUrl}/api/auth/logout`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Logout Success")
			queryClient.invalidateQueries({
				queryKey: ["authUser"]
			})
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});

	const { data: authUser } = useQuery({ queryKey: ["authUser"] })
	console.log(authUser); // Check if authUser is undefined or missing username
	console.log(authUser?.username); // Check if username is undefined

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-300 w-15 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='px-2 w-12 h-12 rounded-full fill-dark ' /><span className='text-2xl font-bold mt-2 hidden md:block'>Clone</span>
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-info transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-info transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${authUser?.userName}`}
							className='flex gap-3 items-center hover:bg-info transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<Link
						to={`/profile/${authUser?.userName}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-white py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={authUser.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between md:justify-start'>
							<div className='w-10'>
								<p className='text-dark font-bold text-md w-20 truncate md:block'>{authUser?.fullName}</p>
								<p className='text-slate-500 text-sm md:block'>@{authUser?.userName}</p>
								<br></br>
								<BiLogOut className='w-8 h-8 cursor-pointer'
									onClick={(e) => {
										e.preventDefault();
										logout();
									}}
								/>
							</div>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;