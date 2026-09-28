import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/Sonner';
import { AppShell } from './components/AppShell';
import { ScrollToTop } from './components/ScrollToTop';
import { ModerationProvider } from './contexts/ModerationContext';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryResults } from './pages/CategoryResults';
import { PlaceDetail } from './pages/PlaceDetail';
import { SearchResults } from './pages/SearchResults';
import { AddListing } from './pages/AddListing';
import { Events } from './pages/Events';
import { Menu } from './pages/Menu';
import { ModerationQueue } from './pages/ModerationQueue';

export function App() {
  return (
    <BrowserRouter>
      <ModerationProvider>
        <ScrollToTop />
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categorie/:categoryId" element={<CategoryResults />} />
            <Route path="/lieu/:placeId" element={<PlaceDetail />} />
            <Route path="/recherche" element={<SearchResults />} />
            <Route path="/ajouter" element={<AddListing />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/moderation" element={<ModerationQueue />} />
            <Route path="/moderation/:submissionId" element={<ModerationQueue />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AppShell>
        <Toaster position="top-center" />
      </ModerationProvider>
    </BrowserRouter>);

}