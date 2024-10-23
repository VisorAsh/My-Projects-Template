import { DesignGrid } from '../components/DesignGrid';

export default function Home() {
  return (
    <DesignGrid
      columns={12}
      margin={{
          top: 0,
          right: 24,
          bottom: 0,
          left: 24
      }}
      gutter={24}
      columnColor="#6366F1"
      opacity={0.1}
    >
      {/* Votre contenu ici */}
      
    </DesignGrid>
  );
}
