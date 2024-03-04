import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage.jsx";
import ProtectRoute from "../components//ProtectRoute.jsx";
import SignIn from "../components/SignIn.jsx";
import DashBoardLayout from "../components/DashBoardLayout.jsx";
import { StatsRoute } from "../components/Stats.jsx";
import Test from "../components/Test.jsx";
import { TourOverViewRoute } from "../components/TourOverView/TourOverViewRoute.jsx";
import { UserListRoute } from "../components/Users/UserListRoute.jsx";
import { TourRoute } from "../components/Tours/TourRoute.jsx";
import { UserUpdateRoute } from "../components/Forms/UserUpdateRoutes.jsx";
import { UserRoute } from "../components/Users/UserRoute.jsx";
import { TourFormRoute } from "../components/Forms/TourForm.jsx";
export const router = createBrowserRouter([
	{ path: "/", element: <Navigate to="signIn" /> },
	{ path: "/signin", element: <SignIn /> },
	{
		path: "/",
		element: <ProtectRoute />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "dashboard",
				element: <DashBoardLayout />,
				children: [
					{ index: true, element: <Navigate to="home" /> },
					{ path: "home", ...StatsRoute },
					{
						path: "users",
						children: [
							{ index: true, ...UserListRoute },
							{ path: "new", element: <h1>New</h1> },
							{
								path: ":userId",
								children: [
									{ index: true, ...UserRoute },
									{ path: "edit", ...UserUpdateRoute },
								],
							},
						],
					},
					{ path: "tests", element: <Test /> },
					{
						path: "tours",
						children: [
							{ index: true, ...TourRoute },
							{ path: "new", ...TourFormRoute },
							{
								path: ":tourId",
								children: [
									{ index: true, ...TourOverViewRoute },
									{ path: "edit", element: <h1>Edit Tour</h1> },
								],
							},
						],
					},
					{ path: "tour/:tourId", ...TourOverViewRoute },
				],
			},
		],
	},
]);
