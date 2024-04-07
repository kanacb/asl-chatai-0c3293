import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import SessionsUserLayoutPage from '../components/SessionsPage/UserLayoutPage';
import SingleSessionsPage from "../components/SessionsPage/SingleSessionsPage";
import SingleChataiPage from "../components/ChataiPage/SingleChataiPage";
import ChataiUserLayoutPage from '../components/ChataiPage/UserLayoutPage';
import ConfigUserLayoutPage from '../components/ConfigPage/UserLayoutPage';
import SingleConfigPage from "../components/ConfigPage/SingleConfigPage";
import PromptsUserLayoutPage from '../components/PromptsPage/UserLayoutPage';
import SinglePromptsPage from "../components/PromptsPage/SinglePromptsPage";
import UserPromptsSavedUserLayoutPage from '../components/UserPromptsSavedPage/UserLayoutPage';
import SingleUserPromptsSavedPage from "../components/UserPromptsSavedPage/SingleUserPromptsSavedPage";
import SamplePromptsUserLayoutPage from '../components/SamplePromptsPage/UserLayoutPage';
import SingleSamplePromptsPage from "../components/SamplePromptsPage/SingleSamplePromptsPage";
import RefConfigUserLayoutPage from '../components/RefConfigPage/UserLayoutPage';
import SingleRefConfigPage from "../components/RefConfigPage/SingleRefConfigPage";
import RefFaDocsUserLayoutPage from '../components/RefFaDocsPage/UserLayoutPage';
import SingleRefFaDocsPage from "../components/RefFaDocsPage/SingleRefFaDocsPage";
import RefBanksUserLayoutPage from '../components/RefBanksPage/UserLayoutPage';
import SingleRefBanksPage from "../components/RefBanksPage/SingleRefBanksPage";
import RefFacilitiesUserLayoutPage from '../components/RefFacilitiesPage/UserLayoutPage';
import SingleRefFacilitiesPage from "../components/RefFacilitiesPage/SingleRefFacilitiesPage";
import ChataiProjectLayoutPage from '../components/ChatAiProjectLayout/ChataiProjectLayoutPage';
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            {/* <Route path="/signup" exact element={<SignUpPage />} /> */}

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                    <Route path="/sessions" exact element={<SessionsUserLayoutPage />} />
                    <Route path="/sessions/:singleSessionsId" exact element={<SingleSessionsPage />} />
                    <Route path="/chataiProject" element={<ChataiProjectLayoutPage />} />
                    <Route path="/chataiProject/:promptId" element={<ChataiProjectLayoutPage />} />
                    <Route path="/chatai" exact element={<ChataiUserLayoutPage />} />
                    <Route path="/chatai/:singleChataiId" exact element={<SingleChataiPage />} />
                    <Route path="/config" exact element={<ConfigUserLayoutPage />} />
                    <Route path="/config/:singleConfigId" exact element={<SingleConfigPage />} />
                    <Route path="/prompts" exact element={<PromptsUserLayoutPage />} />
                    <Route path="/prompts/:singlePromptsId" exact element={<SinglePromptsPage />} />
                    <Route path="/userPromptsSaved" exact element={<UserPromptsSavedUserLayoutPage />} />
                    <Route path="/userPromptsSaved/:singleUserPromptsSavedId" exact element={<SingleUserPromptsSavedPage />} />
                    <Route path="/samplePrompts" exact element={<SamplePromptsUserLayoutPage />} />
                    <Route path="/samplePrompts/:singleSamplePromptsId" exact element={<SingleSamplePromptsPage />} />
                    <Route path="/refConfig" exact element={<RefConfigUserLayoutPage />} />
                    <Route path="/refConfig/:singleRefConfigId" exact element={<SingleRefConfigPage />} />
                    <Route path="/refFaDocs" exact element={<RefFaDocsUserLayoutPage />} />
                    <Route path="/refFaDocs/:singleRefFaDocsId" exact element={<SingleRefFaDocsPage />} />
                    <Route path="/refBanks" exact element={<RefBanksUserLayoutPage />} />
                    <Route path="/refBanks/:singleRefBanksId" exact element={<SingleRefBanksPage />} />
                    <Route path="/refFacilities" exact element={<RefFacilitiesUserLayoutPage />} />
                    <Route path="/refFacilities/:singleRefFacilitiesId" exact element={<SingleRefFacilitiesPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
