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
import SessionsPage from "../components/SessionsPage/SessionsPage";
import SingleSessionsPage from "../components/SessionsPage/SingleSessionsPage";
import ChataiPage from "../components/ChataiPage/ChataiPage";
import SingleChataiPage from "../components/ChataiPage/SingleChataiPage";
import ConfigPage from "../components/ConfigPage/ConfigPage";
import SingleConfigPage from "../components/ConfigPage/SingleConfigPage";
import PromptsPage from "../components/PromptsPage/PromptsPage";
import SinglePromptsPage from "../components/PromptsPage/SinglePromptsPage";
import UserPromptsSavedPage from "../components/UserPromptsSavedPage/UserPromptsSavedPage";
import SingleUserPromptsSavedPage from "../components/UserPromptsSavedPage/SingleUserPromptsSavedPage";
import SamplePromptsPage from "../components/SamplePromptsPage/SamplePromptsPage";
import SingleSamplePromptsPage from "../components/SamplePromptsPage/SingleSamplePromptsPage";
import RefConfigPage from "../components/RefConfigPage/RefConfigPage";
import SingleRefConfigPage from "../components/RefConfigPage/SingleRefConfigPage";
import RefFaDocsPage from "../components/RefFaDocsPage/RefFaDocsPage";
import SingleRefFaDocsPage from "../components/RefFaDocsPage/SingleRefFaDocsPage";
import RefBanksPage from "../components/RefBanksPage/RefBanksPage";
import SingleRefBanksPage from "../components/RefBanksPage/SingleRefBanksPage";
import RefFacilitiesPage from "../components/RefFacilitiesPage/RefFacilitiesPage";
import SingleRefFacilitiesPage from "../components/RefFacilitiesPage/SingleRefFacilitiesPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                    <Route path="/sessions" exact element={<SessionsPage />} />
                    <Route path="/sessions/:singleSessionsId" exact element={<SingleSessionsPage />} />
                    <Route path="/chatai" exact element={<ChataiPage />} />
                    <Route path="/chatai/:singleChataiId" exact element={<SingleChataiPage />} />
                    <Route path="/config" exact element={<ConfigPage />} />
                    <Route path="/config/:singleConfigId" exact element={<SingleConfigPage />} />
                    <Route path="/prompts" exact element={<PromptsPage />} />
                    <Route path="/prompts/:singlePromptsId" exact element={<SinglePromptsPage />} />
                    <Route path="/userPromptsSaved" exact element={<UserPromptsSavedPage />} />
                    <Route path="/userPromptsSaved/:singleUserPromptsSavedId" exact element={<SingleUserPromptsSavedPage />} />
                    <Route path="/samplePrompts" exact element={<SamplePromptsPage />} />
                    <Route path="/samplePrompts/:singleSamplePromptsId" exact element={<SingleSamplePromptsPage />} />
                    <Route path="/refConfig" exact element={<RefConfigPage />} />
                    <Route path="/refConfig/:singleRefConfigId" exact element={<SingleRefConfigPage />} />
                    <Route path="/refFaDocs" exact element={<RefFaDocsPage />} />
                    <Route path="/refFaDocs/:singleRefFaDocsId" exact element={<SingleRefFaDocsPage />} />
                    <Route path="/refBanks" exact element={<RefBanksPage />} />
                    <Route path="/refBanks/:singleRefBanksId" exact element={<SingleRefBanksPage />} />
                    <Route path="/refFacilities" exact element={<RefFacilitiesPage />} />
                    <Route path="/refFacilities/:singleRefFacilitiesId" exact element={<SingleRefFacilitiesPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
