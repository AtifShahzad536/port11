/**
 * Security Questions & Password Configuration for Shally
 * 3 Questions required to unlock:
 * 1. Who put effort for you? -> ans: atifshahzad
 * 2. Who am I for you? -> ans: nothing
 * 3. Date of birth -> ans: 24/03/2003
 */

export const QUESTIONS_CONFIG = [
  {
    id: "effort",
    num: 1,
    question: "Who put effort for you?",
    placeholder: "Apka jawab yahan likhein...",
    hint: "Khaas insaan: useles insan",
    validate: (val) => {
      if (!val) return false;
      const cleaned = val.trim().toLowerCase().replace(/[\s_-]+/g, "");
      return cleaned === "atifshahzad" || cleaned === "atif";
    },
  },
  {
    id: "whoAmI",
    num: 2,
    question: "Who am I for you?",
    placeholder: "Apka jawab yahan likhein...",
    hint: "Jawab: nothing",
    validate: (val) => {
      if (!val) return false;
      const cleaned = val.trim().toLowerCase();
      return cleaned === "nothing" || cleaned === "kuch nahi" || cleaned === "kuch nhi";
    },
  },
  {
    id: "dob",
    num: 3,
    question: "Date of birth",
    placeholder: "DD/MM/YYYY (e.g. 24/03/2003)",
    hint: "Tarikh: 24/03/2003",
    validate: (val) => {
      if (!val) return false;
      const cleaned = val.trim().replace(/[-.]/g, "/");
      const digitsOnly = val.trim().replace(/\D/g, "");
      return (
        cleaned === "24/03/2003" ||
        cleaned === "24/3/2003" ||
        digitsOnly === "24032003"
      );
    },
  },
];

// Helper to validate all 3 answers
export const validateQuestions = (ans1, ans2, ans3) => {
  const isQ1Valid = QUESTIONS_CONFIG[0].validate(ans1);
  const isQ2Valid = QUESTIONS_CONFIG[1].validate(ans2);
  const isQ3Valid = QUESTIONS_CONFIG[2].validate(ans3);

  return {
    allValid: isQ1Valid && isQ2Valid && isQ3Valid,
    isQ1Valid,
    isQ2Valid,
    isQ3Valid,
  };
};

// Storage key used to remember unlocked state
export const AUTH_STORAGE_KEY = "shally_site_unlocked";
