import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function KnowledgeFixVerify() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    navigate(id ? `/knowledge/fixes/${id}` : '/knowledge/fixes', { replace: true });
  }, [id, navigate]);
  return null;
}
