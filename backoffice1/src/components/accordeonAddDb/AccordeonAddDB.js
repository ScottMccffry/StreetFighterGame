import { useEffect, useState } from 'react';
import DbFormFighter from '../AddDbForms/dbFormFighter/DbFormFighter';
import DbFormFightRequest from '../AddDbForms/dbFormFightRequest/DbFormFightRequest';
import DbFormNFTCollections from '../AddDbForms/dbFormNFTCollection/DbFormNFTCollection';
import DbFormNFTMarketplace from '../AddDbForms/dbFormNFTMarketplace/DBFormNFTMarketplace';
import DbFormUser from '../AddDbForms/dbFormUser/DbFormUser';

function AccordionItem({ id, title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <h2 id={id}>
        <button
          type="button"
          className={`flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400`}
          onClick={toggleIsOpen}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <svg className={`w-6 h-6 shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </h2>
      {isOpen && (
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
          {content}
        </div>
      )}
    </>
  );
}

function AccordionAddDb() {
  return (
    <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
      <AccordionItem id="accordion-flush-heading-1" title="Fighter Form" content={<DbFormFighter />} />
      <AccordionItem id="accordion-flush-heading-2" title="Fight Request" content={<DbFormFightRequest/>} />
      <AccordionItem id="accordion-flush-heading-3" title="Add NFT Collection" content={<DbFormNFTCollections />} />
      <AccordionItem id="accordion-flush-heading-3" title="Add NFT on Marketplace" content={<DbFormNFTMarketplace />} />
      <AccordionItem id="accordion-flush-heading-3" title="Add User" content={<DbFormUser />} />
    </div>
  );
}

export default AccordionAddDb;
